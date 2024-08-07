import { Bookmark } from 'src/modules/bookmark/entities/bookmark.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Metadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.metadata)
  bookmarks: Bookmark[];
}
