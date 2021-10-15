import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Airport } from "./Airport";
import { User } from "./User";

@Entity()
export class Flight extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  duration: Date;

  @Column()
  boarding_time: Date;

  @Column()
  distance: string;

  @Column()
  attendance_time: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations

  // many to one
  // Flights --> orgin
  @ManyToOne(() => Airport, (airport) => airport.OriginFlights)
  origin: Airport;

  // many to one
  // Flights --> destination
  @ManyToOne(() => Airport, (airport) => airport.destinationFlights)
  destination: Airport;

  // many to many
  // flight --> user
  @ManyToMany(() => User, (user) => user.flights)
  @JoinTable({ name: "booked-flights" })
  users: User[];
}
