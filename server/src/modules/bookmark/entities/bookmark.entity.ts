import { Folder } from 'src/modules/folder/entities/folder.entity';
import { Metadata } from 'src/modules/metadata/entities/metadata.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  folderId: number;

  @Column()
  metadataId: number;

  @Column()
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => Folder, (folder) => folder.bookmarks)
  @JoinColumn({ name: 'folderId' })
  folder: Folder;

  @ManyToOne(() => Metadata, (metadata) => metadata.bookmarks)
  @JoinColumn({ name: 'metadataId' })
  metadata: Metadata;

  @ManyToOne(() => User, (user) => user.folders)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
