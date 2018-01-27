defmodule SmartGardenWeb.IntervalController do
  use SmartGardenWeb, :controller

  def index(conn, %{"device_id" => device_id}) do
    intervals = SmartGarden.Interval.get_all_by_device device_id
    conn 
      |> render("index.json", intervals: intervals)
  end

  def show(conn, %{"device_id" => _device_id, "id" => id}) do
    interval = SmartGarden.Repo.get SmartGarden.Interval, id
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
      {:error, _changeset} ->
        json conn |> put_status(:bad_request), %{errors: ["unable to create interval"] }
    end
  end

end
