defmodule SmartGardenWeb.IntervalView do
  
  use SmartGardenWeb, :view

  def render("show.json", %{interval: interval}) do
    interval_json(interval)
  end

  def render("index.json", %{intervals: intervals}) do
    %{
      intervals: Enum.map(intervals, &interval_json/1)
    }
  end

  def render("error.json", %{changeset: changeset}) do
    %{
      errors: Ecto.Changeset.traverse_errors(changeset, &translate_error/1)
    }
  end

  def interval_json(interval) do
    %{
      id: interval.id,
      name: interval.name,
      value: round(interval.value),
      action: interval.action,
      execution_schedule: interval.execution_schedule,
      active: interval.active,
      force_open: interval.force_open
    }
  end

end