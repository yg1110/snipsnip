import { Bookmark } from 'src/modules/bookmark/entities/bookmark.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  parentFolderId: number | null;

  @Column()
  order: number;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.folder)
  bookmarks: Bookmark[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
