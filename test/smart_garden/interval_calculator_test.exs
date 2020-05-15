defmodule SmartGarden.IntervalCalculatorTest do
  use SmartGarden.DataCase

  setup do
    current_time = DateTime.utc_now |> DateTime.to_time
    {:ok, %{current_time: current_time}}
  end

  test "returns the action when the date matches and the state is not open", %{current_time: current_time} do
    device = SmartGarden.Repo.insert! %SmartGarden.Device{name: "Arduino"}
    SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "action", 
      action: "polling",
      value: 0,
      execution_schedule: "#{current_time.minute} #{current_time.hour} * * *"
    }

    next_interval = SmartGarden.IntervalCalculator.next_interval_for(device, "close")
    assert next_interval.action == "polling"
  end

  test "returns the action when the date matches and the state is open", %{current_time: current_time} do
    device = SmartGarden.Repo.insert! %SmartGarden.Device{name: "Arduino"}
    SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "action", 
      action: "open-valve",
      value: 0,
      execution_schedule: "#{current_time.minute} #{current_time.hour} * * *"
    }

    next_interval = SmartGarden.IntervalCalculator.next_interval_for(device, "open")
    assert next_interval.action == "close-valve"
  end
end