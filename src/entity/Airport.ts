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
  // all the flight that will take off from this airport.
  @OneToMany(() => Flight, (flight) => flight.origin)
  OriginFlights: Flight[];

  //one to many
  // airport --> destination
  // all the flight that will land in this airport.
  @OneToMany(() => Flight, (flight) => flight.destination)
  destinationFlights: Flight[];
}
