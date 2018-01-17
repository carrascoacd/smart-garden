defmodule SmartGardenWeb.IntervalController do
  use SmartGardenWeb, :controller

  def create(conn, params, _device) do
    changeset = SmartGarden.Interval.changeset(%SmartGarden.Interval{}, params)
    case SmartGarden.Repo.insert(changeset) do
      {:ok, interval} ->
        json conn |> put_status(:created), interval
      {:error, _changeset} ->
        json conn |> put_status(:bad_request), %{errors: ["unable to create interval"] }
    end
  end

end
