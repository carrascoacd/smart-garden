defmodule SmartGarden.Repo.Migrations.CreateDevices do
  use Ecto.Migration

  def change do
    create table(:devices) do
      add :name, :string
      timestamps()
    end
  end
end
