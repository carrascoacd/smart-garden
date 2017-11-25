defmodule SmartGarden.DeviceView do
  use SmartGardenWeb, :view

  def render("index.json", %{devices: devices}) do
    %{
      devices: Enum.map(devices, &devices_json/1)
    }
  end

  def devices_json(device) do
    %{
      name: device.name
    }
  end
end