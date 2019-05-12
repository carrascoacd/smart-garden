defmodule SmartGardenWeb.IntervalController do
  use SmartGardenWeb, :controller

  alias SmartGarden.{Repo, Interval, Device}

  def index(conn, %{"device_id" => device_id}) do
    intervals = Interval.get_all_by_device device_id
    conn 
      |> render("index.json", intervals: intervals)
  end

  def show(conn, %{"device_id" => device_id, "id" => "next"}) do
    device = Repo.get!(Device, device_id)
    interval = SmartGarden.IntervalCalculator.next_interval_for(device)
    conn 
      |> render("show.json", interval: interval)
  end

  def show(conn, %{"device_id" => _device_id, "id" => id}) do
    interval = Repo.get! Interval, id
    conn 
      |> render("show.json", interval: interval)
  end

  def create(conn, %{"device_id" => device_id, "interval" => interval_params}) do
    interval_params = Map.merge(interval_params, %{"device_id" => device_id})
    changeset = Interval.changeset(%Interval{}, interval_params)
    case Repo.insert(changeset) do
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
    interval = Repo.get! Interval, id
    changeset = Interval.changeset(interval, interval_params)
    case Repo.update(changeset) do
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
