import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export default class User {
  @PrimaryColumn()
  email!: string;

  @Column({
    select: false,
  })
  password!: string;

  @Column({
    type: 'varchar'
  })
  name!: string;

  @Column({
    type: 'int'
  })
  role!: number;
}