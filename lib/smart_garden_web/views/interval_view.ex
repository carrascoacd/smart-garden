defmodule SmartGardenWeb.IntervalView do
  
  use SmartGardenWeb, :view

  def render("show.json", %{interval: interval}) do
    %{
      name: interval.name,
      value: round(interval.value)
    }
  end

end