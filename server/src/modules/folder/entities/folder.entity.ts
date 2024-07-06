import { Bookmark } from 'src/modules/bookmark/entities/bookmark.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  userId: number;

  @Column({ nullable: true })
  parentFolderId: number | null;

  @Column()
  order: number;

  @ManyToOne(() => User, (user) => user.folders)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.folder)
  bookmarks: Bookmark[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
