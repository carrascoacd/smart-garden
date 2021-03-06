defmodule SmartGardenWeb.WeatherEntriesController do
  use SmartGardenWeb, :controller

  alias SmartGarden.Repo
  alias SmartGarden.Device
  alias SmartGarden.WeatherEntry

  plug(Plug.Logger, log: :debug)

  def index(conn, %{"device_id" => device_id}) do
    weather_entries = WeatherEntry.get_all_by_device(device_id)

    conn
    |> render("index.json", weather_entries: weather_entries)
  end

  def show(conn, %{"device_id" => _device_id, "id" => id}) do
    weather_entry = Repo.get(WeatherEntry, id)

    conn
    |> render("show.json", weather_entry: weather_entry)
  end

  def create(conn, %{"device_id" => device_id, "w" => weather_entry_params}) do
    weather_entry_data = %{
      "moisture" => Map.get(weather_entry_params, "m"),
      "humidity" => Map.get(weather_entry_params, "h"),
      "temperature" => Map.get(weather_entry_params, "t"),
      "soil_temperature" => Map.get(weather_entry_params, "st", 0),
      "main_voltage" => Map.get(weather_entry_params, "mv", 0),
      "secondary_voltage" => Map.get(weather_entry_params, "sv", 0),
      "volume" => Map.get(weather_entry_params, "v", 0.0),
      "state" => Map.get(weather_entry_params, "s", 0),
      "device_id" => device_id
    }

    changeset = WeatherEntry.changeset(%WeatherEntry{}, weather_entry_data)
    device = Repo.get!(Device, device_id)
    interval = SmartGarden.IntervalCalculator.next_interval_for(device, changeset.changes.state)

    case WeatherEntry.maybe_insert(changeset) do
      {:ok, _weather_entry} ->
        conn
        |> put_status(:created)
        |> render("create.json", interval: interval)

      {:error, _changeset} ->
        conn
        |> put_status(:ok)
        |> render("create.json", interval: interval)
    end
  end
end
