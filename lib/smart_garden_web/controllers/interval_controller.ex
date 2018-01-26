defmodule SmartGardenWeb.IntervalController do
  use SmartGardenWeb, :controller

  def create(conn, %{"device_id" => _device_id, "interval" => interval_params}) do
    changeset = SmartGarden.Interval.changeset(%SmartGarden.Interval{}, interval_params)
    case SmartGarden.Repo.insert(changeset) do
      {:ok, interval_params} ->
        conn 
          |> put_status(:created) 
          |> render("show.json", interval: interval_params)
      {:error, _changeset} ->
        json conn |> put_status(:bad_request), %{errors: ["unable to create interval"] }
    end
  end

end
