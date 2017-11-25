defmodule SmartGarden.Factory do
  use ExMachina.Ecto, repo: SmartGarden.Device

  def device_factory do
    %SmartGarden.Device{
      name: "Arduino Nano",
    }
  end
end