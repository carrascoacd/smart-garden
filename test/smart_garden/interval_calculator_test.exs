defmodule SmartGarden.IntervalCalculatorTest do
  use SmartGarden.DataCase

  setup do
    current_time = DateTime.utc_now |> DateTime.to_time
    {:ok, %{current_time: current_time}}
  end

  test "return the next polling interval", %{current_time: current_time} do
    device = SmartGarden.Repo.insert! %SmartGarden.Device{name: "Arduino"}
    control_time = Time.add(current_time, -60 * 22, :seconds)
    SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "action", 
      action: "open-valve",
      value: 20 * 60 * 1000,
      execution_schedule: "#{control_time.minute} #{control_time.hour} * * *",
    }
    polling_interval = SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "polling", 
      action: "polling",
      value: 20 * 60 * 1000,
      execution_schedule: "#{current_time.minute} #{current_time.hour} * * *"
    }
    next_interval = SmartGarden.IntervalCalculator.next_interval_for(device, "close")
    assert next_interval.id == polling_interval.id
  end

  test "return the next control interval", %{current_time: current_time} do
    device = SmartGarden.Repo.insert! %SmartGarden.Device{name: "Arduino"}
    SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "action", 
      action: "open-valve",
      value: 20 * 60 * 1000,
      execution_schedule: "#{current_time.minute} #{current_time.hour} * * *"
    }
    desired_time = Time.add(current_time, -60, :seconds)
    polling_interval = SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "polling", 
      action: "polling", 
      execution_schedule: "#{desired_time.minute} #{desired_time.hour} * * *"
    }
    next_interval = SmartGarden.IntervalCalculator.next_interval_for(device, "close")
    assert next_interval.id == polling_interval.id
    assert next_interval.action == "open-valve"
  end

  test "return the control interval considering the value", %{current_time: current_time} do
    device = SmartGarden.Repo.insert! %SmartGarden.Device{name: "Arduino"}
    control_time = Time.add(current_time, -600, :seconds)
    SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "action", 
      action: "open-valve",
      value: 20 * 60 * 1000,
      active: true,
      execution_schedule: "#{control_time.minute} #{control_time.hour} * * *"
    }
    polling_time = Time.add(current_time, -60, :seconds)
    polling_interval = SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "polling", 
      action: "polling", 
      execution_schedule: "#{polling_time.minute} #{polling_time.hour} * * *"
    }
    next_interval = SmartGarden.IntervalCalculator.next_interval_for(device, "close")
    assert next_interval.id == polling_interval.id
    assert next_interval.action == "open-valve"
  end

  test "return the polling interval if no control interval is active", %{current_time: current_time} do
    device = SmartGarden.Repo.insert! %SmartGarden.Device{name: "Arduino"}
    SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "action", 
      action: "open-valve", 
      execution_schedule: "#{current_time.minute} #{current_time.hour} * * *",
      active: false
    }
    polling_time = Time.add(current_time, 60, :seconds)
    polling_interval = SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "polling", 
      action: "polling", 
      execution_schedule: "#{polling_time.minute} #{polling_time.hour} * * *"
    }
    next_interval = SmartGarden.IntervalCalculator.next_interval_for(device, "close")
    assert next_interval.id == polling_interval.id
    assert next_interval.action == "polling"
  end

  test "return the control interval if force open is true", %{current_time: current_time} do
    device = SmartGarden.Repo.insert! %SmartGarden.Device{name: "Arduino"}
    SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "action", 
      action: "open-valve", 
      execution_schedule: "#{current_time.minute} #{current_time.hour} * * *",
      active: false,
      force_open: true
    }
    polling_time = Time.add(current_time, 60, :seconds)
    polling_interval = SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "polling", 
      action: "polling", 
      execution_schedule: "#{polling_time.minute} #{polling_time.hour} * * *"
    }
    next_interval = SmartGarden.IntervalCalculator.next_interval_for(device, "close")
    assert next_interval.id == polling_interval.id
    assert next_interval.action == "open-valve"
  end

  test "return the control interval for state open", %{current_time: current_time} do
    device = SmartGarden.Repo.insert! %SmartGarden.Device{name: "Arduino"}
    SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "action", 
      action: "open-valve",
      value: 0,
      execution_schedule: "#{current_time.minute} #{current_time.hour} * * *"
    }
    polling_time = Time.add(current_time, 60, :seconds)
    polling_interval = SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "polling", 
      action: "polling", 
      execution_schedule: "#{polling_time.minute} #{polling_time.hour} * * *"
    }
    next_interval = SmartGarden.IntervalCalculator.next_interval_for(device, "open")
    assert next_interval.id == polling_interval.id
    assert next_interval.action == "close-valve"
  end

  test "return the control interval with state reset", %{current_time: current_time} do
    device = SmartGarden.Repo.insert! %SmartGarden.Device{name: "Arduino"}
    SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "action", 
      action: "reset",
      value: 0,
      execution_schedule: "#{current_time.minute} #{current_time.hour} * * *"
    }
    polling_time = Time.add(current_time, 60, :seconds)
    polling_interval = SmartGarden.Repo.insert! %SmartGarden.Interval{
      device: device, 
      name: "polling", 
      action: "polling", 
      execution_schedule: "#{polling_time.minute} #{polling_time.hour} * * *"
    }
    next_interval = SmartGarden.IntervalCalculator.next_interval_for(device, "open")
    assert next_interval.id == polling_interval.id
    assert next_interval.action == "reset"
  end
end