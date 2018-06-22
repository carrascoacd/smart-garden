defmodule SmartGardenWeb.WeatherEntriesController do
  use SmartGardenWeb, :controller

  alias SmartGarden.Repo
  alias SmartGarden.Device
  alias SmartGarden.WeatherEntry

  def index(conn, %{"device_id" => device_id}) do
    weather_entries = WeatherEntry.get_all_by_device device_id
    conn 
      |> render("index.json", weather_entries: weather_entries)
  end

  def show(conn, %{"device_id" => _device_id, "id" => id}) do
    weather_entry = Repo.get WeatherEntry, id
    conn 
      |> render("show.json", weather_entry: weather_entry)
  end

  def create(conn, %{"device_id" => device_id, "w" => weather_entry_params}) do
    weather_entry_data = %{
      "moisture" => Map.get(weather_entry_params, "m"),
      "humidity" => Map.get(weather_entry_params, "h"),
      "temperature" => Map.get(weather_entry_params, "t"),
      "device_id" => device_id
    }
    changeset = WeatherEntry.changeset(%WeatherEntry{}, weather_entry_data)
    case Repo.insert(changeset) do
      {:ok, _weather_entry} ->
        device = Repo.get!(Device, device_id)
        interval = SmartGarden.IntervalCalculator.next_interval_for device
        conn 
          |> put_status(:created) 
          |> render("create.json", interval: interval)
      {:error, _changeset} ->
        json conn |> put_status(:bad_request), %{errors: ["unable to create weather_entry"] }
    end
  end

end
