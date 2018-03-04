defmodule SmartGarden.IntervalCalculatorTest do
  use SmartGarden.DataCase

  test "return the next polling interval" do
    device = SmartGarden.Repo.insert! %SmartGarden.Device{name: "Arduino"}
    SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "action", 
      action: "open-valve", 
      execution_schedule: "#{NaiveDateTime.utc_now.minute - 1} * * * *"
    }
    polling_interval = SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "polling", 
      action: "polling",
      execution_schedule: "#{NaiveDateTime.utc_now.minute} * * * *"
    }
    next_interval = SmartGarden.IntervalCalculator.next_interval_for device
    assert next_interval.id == polling_interval.id
  end

  test "return the next action interval" do
    device = SmartGarden.Repo.insert! %SmartGarden.Device{name: "Arduino"}
    action_interval = SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "action", 
      action: "open-valve", 
      execution_schedule: "#{NaiveDateTime.utc_now.minute} * * * *"
    }
    SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "polling", 
      action: "polling", 
      execution_schedule: "#{NaiveDateTime.utc_now.minute - 1} * * * *"
    }
    next_interval = SmartGarden.IntervalCalculator.next_interval_for device
    assert next_interval.id == action_interval.id
  end

end