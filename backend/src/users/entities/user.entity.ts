
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Link } from '../../links/entities/link.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
  
  @Column()
  country: string;
  
  @Column()
  countryCode: string;
  
  @Column()
  phone: string;

  @OneToMany(() => Link, (link) => link.user)
  links: Link[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
