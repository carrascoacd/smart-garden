defmodule SmartGarden.IntervalCalculatorTest do
  alias SmartGarden.{Interval, Device, Repo, IntervalCalculator}
  
  use SmartGarden.DataCase

  @one_hour_min 60
  @device %Device{name: "Arduino"}
  @interval %Interval{
    name: "action",
    action: "polling",
    value: 2 * @one_hour_min * 60 * 1000 # 2 Hours
  }

  setup do
    device = Repo.insert!(@device)
    current_time = DateTime.to_time(DateTime.utc_now())
    {:ok, %{current_time: current_time, device: device}}
  end

  test "returns the first interval by priority if matches", %{
    current_time: current_time, device: device
  } do
    Repo.insert!(%Interval{
      @interval |
      name: "interval-1",
      index: 0,
      execution_schedule: "* #{current_time.hour} * * *",
      device_id: device.id
    })

    Repo.insert!(%Interval{
      @interval |
      name: "interval-2",
      index: 1,
      execution_schedule: "* #{current_time.hour - 1} * * *",
      device_id: device.id
    })

    next_interval = IntervalCalculator.next_interval_for(device, nil)
    assert next_interval.name == "interval-1"
  end

  test "returns the second interval by priority", %{
    current_time: current_time, device: device
  } do
    Repo.insert!(%Interval{
      @interval |
      name: "interval-1",
      index: 1,
      execution_schedule: "* #{current_time.hour} * * *",
      device_id: device.id
    })

    Repo.insert!(%Interval{
      @interval |
      name: "interval-2",
      index: 0,
      execution_schedule: "* #{current_time.hour} * * *",
      device_id: device.id
    })

    next_interval = IntervalCalculator.next_interval_for(device, nil)
    assert next_interval.name == "interval-2"
  end
end
