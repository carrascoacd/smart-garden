# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     SmartGarden.Repo.insert!(%SmartGarden.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias SmartGarden.Device
alias SmartGarden.Interval
alias SmartGarden.Repo

device = Repo.insert!(Device.changeset(%Device{}, %{name: "Arduino Device"}))
Repo.insert!(Interval.changeset(%Interval{},
  %{device_id: device.id, 
    value: 1, 
    name: "polling", 
    execution_schedule: "* * * * *", 
    active: true, 
    action: "polling"}))
Repo.insert!(Interval.changeset(%Interval{}, 
  %{device_id: device.id, 
    value: 1, 
    name: "irrigation", 
    execution_schedule: "* * * * *", 
    active: true, 
    action: "open-valve"}))
