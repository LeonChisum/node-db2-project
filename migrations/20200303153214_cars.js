
exports.up = async function(knex) {
  await knex.schema.createTable("cars", (table) => {
    //   table.integer("id").notNull().unique().primary()
    table.increments("id")
    table.text("make").notNull()
    table.text("model").notNull()
    table.integer("mileage").notNull()
    table.integer("vin").notNull()
    table.text("transmissionType")
    table.text("titleStatus")
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("cars")
};
