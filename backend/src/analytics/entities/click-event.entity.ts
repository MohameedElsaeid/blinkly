
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Link } from '../../links/entities/link.entity';

@Entity('click_events')
export class ClickEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  ipAddress: string;

  @Column({ nullable: true })
  userAgent: string;

  @Column({ nullable: true })
  referrer: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  device: string;

  @Column({ nullable: true })
  browser: string;

  @ManyToOne(() => Link, (link) => link.clickEvents)
  link: Link;

  @CreateDateColumn()
  timestamp: Date;
}
