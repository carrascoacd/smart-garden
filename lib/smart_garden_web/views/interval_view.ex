defmodule SmartGardenWeb.IntervalView do
  
  use SmartGardenWeb, :view

  def render("show.json", %{interval: interval}) do
    %{
      name: interval.name,
      value: round(interval.value)
    }
  end

  def render("index.json", %{intervals: intervals}) do
    %{
      intervals: Enum.map(intervals, &interval_json/1)
    }
  end

  def interval_json(interval) do
    %{
      name: interval.name,
      value: round(interval.value)
    }
  end

end