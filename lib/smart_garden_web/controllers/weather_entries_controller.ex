defmodule SmartGardenWeb.WeatherEntriesController do
  use SmartGardenWeb, :controller

  def index(conn, %{"device_id" => device_id}) do
    weather_entries = SmartGarden.WeatherEntry.get_all_by_device device_id
    conn 
      |> render("index.json", weather_entries: weather_entries)
  end

  def show(conn, %{"device_id" => _device_id, "id" => id}) do
    weather_entry = SmartGarden.Repo.get SmartGarden.WeatherEntry, id
    conn 
      |> render("show.json", weather_entry: weather_entry)
  end

  def create(conn, %{"device_id" => device_id, "weather_entry" => weather_entry_params}) do
    weather_entry_params = Map.merge(weather_entry_params, %{"device_id" => device_id})
    changeset = SmartGarden.WeatherEntry.changeset(%SmartGarden.WeatherEntry{}, weather_entry_params)
    case SmartGarden.Repo.insert(changeset) do
      {:ok, _weather_entry} ->
        device = SmartGarden.Repo.get!(SmartGarden.Device, device_id)
        interval = SmartGarden.IntervalCalculator.next_interval_for device
        conn 
          |> put_status(:created) 
          |> render("create.json", interval: interval)
      {:error, _changeset} ->
        json conn |> put_status(:bad_request), %{errors: ["unable to create weather_entry"] }
    end
  end

end
