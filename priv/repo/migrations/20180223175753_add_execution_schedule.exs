defmodule SmartGarden.Repo.Migrations.AddExecutionSchedule do
  use Ecto.Migration

  def change do
    alter table(:intervals) do
      add :execution_schedule, :string
    end
  end
end
