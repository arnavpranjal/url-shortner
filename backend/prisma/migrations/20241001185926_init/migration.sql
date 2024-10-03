/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `url` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "url_id_key" ON "url"("id");
