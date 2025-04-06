
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ClickEvent } from '../../analytics/entities/click-event.entity';

@Entity('links')
export class Link {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalUrl: string;

  @Column({ unique: true })
  alias: string;

  @Column({ default: true })
  isActive: boolean;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @ManyToOne(() => User, (user) => user.links)
  user: User;

  @OneToMany(() => ClickEvent, (clickEvent) => clickEvent.link)
  clickEvents: ClickEvent[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Calculated field
  get clicks(): number {
    return this.clickEvents ? this.clickEvents.length : 0;
  }
}
