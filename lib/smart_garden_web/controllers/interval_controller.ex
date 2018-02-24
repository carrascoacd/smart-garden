defmodule SmartGardenWeb.IntervalController do
  use SmartGardenWeb, :controller

  def index(conn, %{"device_id" => device_id}) do
    intervals = SmartGarden.Interval.get_all_by_device device_id
    conn 
      |> render("index.json", intervals: intervals)
  end

  def show(conn, %{"device_id" => _device_id, "id" => id}) do
    interval = SmartGarden.Repo.get! SmartGarden.Interval, id
    conn 
      |> render("show.json", interval: interval)
  end

  def create(conn, %{"device_id" => device_id, "interval" => interval_params}) do
    interval_params = Map.merge(interval_params, %{"device_id" => device_id})
    changeset = SmartGarden.Interval.changeset(%SmartGarden.Interval{}, interval_params)
    case SmartGarden.Repo.insert(changeset) do
      {:ok, interval} ->
        conn 
          |> put_status(:created) 
          |> render("show.json", interval: interval)
      {:error, changeset} ->
        conn 
          |> put_status(:bad_request)
          |> render("error.json", changeset: changeset)
    end
  end

  def update(conn, %{"device_id" => _device_id, "id" => id, "interval" => interval_params}) do
    interval = SmartGarden.Repo.get! SmartGarden.Interval, id
    changeset = SmartGarden.Interval.changeset(interval, interval_params)
    case SmartGarden.Repo.update(changeset) do
      {:ok, interval} ->
        conn 
          |> put_status(:ok) 
          |> render("show.json", interval: interval)
      {:error, changeset} ->
        conn 
          |> put_status(:bad_request)
          |> render("error.json", changeset: changeset)
    end
  end

end
