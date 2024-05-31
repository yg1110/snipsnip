import { Folder } from 'src/modules/folder/entities/folder.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  folderId: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  thumbnail: string | null;

  @Column()
  url: string;

  @Column()
  order: number;

  @ManyToOne(() => Folder, (folder) => folder.bookmarks)
  folder: Folder;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
