import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { City } from "./City";
import { Flight } from "./Flight";

@Entity()
export class Airport extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //Many to One
  //Airports --> City
  @ManyToOne(() => City, (city) => city.airports)
  city: City;

  //one to many
  // airport --> flights
  @OneToMany(() => Flight, (flight) => flight.origin)
  OriginFlights: Flight[];

  //one to many
  // airport --> destination
  @OneToMany(() => Flight, (flight) => flight.destination)
  destinationFlights: Flight[];
}
