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

  def create(conn, %{"device_id" => device_id, "weather_entry" => interval_params}) do
    interval_params = Map.merge(interval_params, %{"device_id" => device_id})
    changeset = SmartGarden.WeatherEntry.changeset(%SmartGarden.WeatherEntry{}, interval_params)
    case SmartGarden.Repo.insert(changeset) do
      {:ok, weather_entry} ->
        interval = SmartGarden.Repo.get_by SmartGarden.Interval, device_id: device_id
        conn 
          |> put_status(:created) 
          |> render("create.json", interval: interval)
      {:error, _changeset} ->
        json conn |> put_status(:bad_request), %{errors: ["unable to create weather_entry"] }
    end
  end

end
