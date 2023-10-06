-- CreateEnum
CREATE TYPE "extensaotemplate" AS ENUM ('CSV', 'XLS', 'XLSX');

-- CreateEnum
CREATE TYPE "perfilacesso" AS ENUM ('Cadastro', 'Administrador');

-- CreateEnum
CREATE TYPE "tipodado" AS ENUM ('Integer', 'Double', 'Date', 'Timestamp', 'Booleano', 'String');

-- CreateTable
CREATE TABLE "campos" (
    "idcampo" SERIAL NOT NULL,
    "nomecampo" VARCHAR(100) NOT NULL,
    "permitenulo" BOOLEAN NOT NULL,
    "tipodado" "tipodado" NOT NULL,

    CONSTRAINT "campos_pkey" PRIMARY KEY ("idcampo")
);

-- CreateTable
CREATE TABLE "campostemplates" (
    "idcampo" INTEGER NOT NULL,
    "idtemplate" INTEGER NOT NULL,

    CONSTRAINT "campo_template_pkey" PRIMARY KEY ("idcampo","idtemplate")
);

-- CreateTable
CREATE TABLE "templates" (
    "idtemplate" SERIAL NOT NULL,
    "nometemplate" VARCHAR(100) NOT NULL,
    "extensaotemplate" "extensaotemplate" NOT NULL,
    "data_criacao" TIMESTAMP(6) NOT NULL,
    "statustemplate" BOOLEAN NOT NULL,
    "qtd_colunas" INTEGER NOT NULL,
    "idusuario" INTEGER NOT NULL,

    CONSTRAINT "templates_pkey" PRIMARY KEY ("idtemplate")
);

-- CreateTable
CREATE TABLE "uploads" (
    "idupload" SERIAL NOT NULL,
    "nomeupload" VARCHAR(100) NOT NULL,
    "caminhosalvamento" VARCHAR(255),
    "data_upload" TIMESTAMP(6) NOT NULL,
    "idtemplate" INTEGER NOT NULL,
    "idusuario" INTEGER NOT NULL,

    CONSTRAINT "uploads_pkey" PRIMARY KEY ("idupload")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "idusuario" SERIAL NOT NULL,
    "nome_completo" VARCHAR(100) NOT NULL,
    "perfilacesso" "perfilacesso" NOT NULL,
    "matricula" VARCHAR(45) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(45) NOT NULL,
    "squad" VARCHAR(45) NOT NULL,
    "cargo" VARCHAR(45) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("idusuario")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_matricula_key" ON "usuarios"("matricula");

-- AddForeignKey
ALTER TABLE "campostemplates" ADD CONSTRAINT "campostemplates_idcampo_fkey" FOREIGN KEY ("idcampo") REFERENCES "campos"("idcampo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "campostemplates" ADD CONSTRAINT "campostemplates_idtemplate_fkey" FOREIGN KEY ("idtemplate") REFERENCES "templates"("idtemplate") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "templates" ADD CONSTRAINT "templates_idusuario_fkey" FOREIGN KEY ("idusuario") REFERENCES "usuarios"("idusuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "uploads" ADD CONSTRAINT "uploads_idtemplate_fkey" FOREIGN KEY ("idtemplate") REFERENCES "templates"("idtemplate") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "uploads" ADD CONSTRAINT "uploads_idusuario_fkey" FOREIGN KEY ("idusuario") REFERENCES "usuarios"("idusuario") ON DELETE NO ACTION ON UPDATE NO ACTION;
