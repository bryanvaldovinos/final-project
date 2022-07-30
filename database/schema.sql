set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "records" (
  "recordId" serial not null,
  "runnerName" text not null,
  "distance" text not null,
  "time" text not null,
  "createdAt" timestamptz not null default now(),
  constraint "records_pk" primary key ("recordId")
) with (
  OIDS=false
);
