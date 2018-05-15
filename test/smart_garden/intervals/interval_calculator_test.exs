defmodule SmartGarden.IntervalCalculatorTest do
  use SmartGarden.DataCase

  setup do
    current_time = DateTime.utc_now |> DateTime.to_time
    {:ok, %{current_time: current_time}}
  end

  test "return the next polling interval", %{current_time: current_time} do
    device = SmartGarden.Repo.insert! %SmartGarden.Device{name: "Arduino"}
    SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "action", 
      action: "open-valve",
      value: 20,
      execution_schedule: "#{Time.add(current_time, -60 * 22, :seconds).minute} * * * *",
    }
    polling_interval = SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "polling", 
      action: "polling",
      value: 20,
      execution_schedule: "#{current_time.minute} * * * *"
    }
    next_interval = SmartGarden.IntervalCalculator.next_interval_for device
    assert next_interval.id == polling_interval.id
  end

  test "return the next control interval", %{current_time: current_time} do
    device = SmartGarden.Repo.insert! %SmartGarden.Device{name: "Arduino"}
    control_interval = SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "action", 
      action: "open-valve",
      value: 20,
      execution_schedule: "#{current_time.minute} #{current_time.hour} * * *"
    }
    desired_time = Time.add(current_time, -60, :seconds)
    SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "polling", 
      action: "polling", 
      execution_schedule: "#{desired_time.minute} #{desired_time.hour} * * *"
    }
    next_interval = SmartGarden.IntervalCalculator.next_interval_for device
    assert next_interval.id == control_interval.id
  end

  test "return the control interval considering the value", %{current_time: current_time} do
    device = SmartGarden.Repo.insert! %SmartGarden.Device{name: "Arduino"}
    control_interval = SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "action", 
      action: "open-valve",
      value: 20,
      execution_schedule: "#{Time.add(current_time, -600, :seconds).minute} * * * *"
    }
    SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "polling", 
      action: "polling", 
      execution_schedule: "#{Time.add(current_time, -60, :seconds).minute} * * * *"
    }
    next_interval = SmartGarden.IntervalCalculator.next_interval_for device
    assert next_interval.id == control_interval.id
  end

  test "return the polling interval if no control interval is active", %{current_time: current_time} do
    device = SmartGarden.Repo.insert! %SmartGarden.Device{name: "Arduino"}
    SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "action", 
      action: "open-valve", 
      execution_schedule: "#{current_time.minute} * * * *",
      active: false
    }
    polling_interval = SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "polling", 
      action: "polling", 
      execution_schedule: "#{Time.add(current_time, 60, :seconds).minute} * * * *"
    }
    next_interval = SmartGarden.IntervalCalculator.next_interval_for device
    assert next_interval.id == polling_interval.id
  end

end