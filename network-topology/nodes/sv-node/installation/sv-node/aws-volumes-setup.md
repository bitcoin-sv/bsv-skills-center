# AWS Volumes Setup

The `bitcoin-data` folder will contain the logs, blocks, UTXO set (stored in `chainstate`) and various other files the SV Node needs to function. For mainnet this folder will get very big, around 350GB for the UTXO set and 12TB for the blocks as of January 2024. The UTXO set is used for lookups to validate transactions and should be stored on a high-performant SSD. Depending on your use case, the blocks can be stored on slower, cheaper HDD storage.

If setting up the node in AWS, the recommendation is to use an instance type with strong single threaded performance like [r7i](https://instances.vantage.sh/aws/ec2/r7i.4xlarge) and mount 1 or more EBS volumes of `sc1` type for the `bitcoin-data/blocks` folder and use an EBS mounted `io2` for the `bitcoin-data` folder including the `chainstate`.

For the blocks mount, it is recommended to use LVM to get around the AWS limitation of 16TB per volume, this will be needed as the blocks folder will continue to grow over time.

For `io2` be mindful of the pricing: a 500GB disk with 3000 IOPS is $260 per month, a 500GB disk with 64000 IOPS is $3600 per month. 3000 IOPS should suffice, the main advantage `io2` will bring is improved latency.

## Installation

These commands assume the larger, slower storage is at `/dev/nvme1n1` and the fast storage is at `/dev/nvme2n1`

#### Step 1: Install LVM2

```bash
sudo apt-get update
sudo apt-get install lvm2
```

#### Step 2: Prepare Physical Volume

Create LVM physical volumes the slower storage:

```bash
sudo pvcreate /dev/nvme1n1
```

#### Step 3: Create a Volume Group

Create a volume group including the relevant devices:

```bash
sudo vgcreate vg0 /dev/nvme1n1
sudo lvcreate -l 100%FREE -n lv_data vg0 /dev/nvme1n1
```

#### Step 4: Format and Mount the Logical Volume

Format the cached logical volume and mount it:

```bash
sudo mkfs.ext4 /dev/vg0/lv_data
sudo mkdir /mnt/bitcoin-blocks
sudo mount /dev/vg0/lv_data /mnt/bitcoin-blocks
```

#### Step 5: Format and Mount the SSD volume

Format the SSD volume and mount it:

```bash
sudo mkfs.ext4 /dev/nvme2n1
sudo mkdir /mnt/bitcoin-data
sudo mount /dev/nvme2n1 /mnt/bitcoin-data
```

#### Step 6: Create the symlinks

```bash
ln -s /mnt/bitcoin-data ~/bitcoin-data
ln -s /mnt/bitcoin-blocks ~/bitcoin-data/blocks
```

#### Step 7: Automount on Startup

Edit `/etc/fstab` to automount the logical volume on startup:

1.  Get the UUID:

    ```bash
    sudo blkid /dev/vg0/lv_data
    sudo blkid /dev/nvme2n1
    ```
2.  Add to `/etc/fstab` (replace `<your-UUID>` with the actual UUIDs):

    ```none
    UUID="<your-UUID-of-vg0>" /mnt/bitcoin-blocks ext4 defaults 0 2
    UUID="<your-UUID-of-nvme2n1>" /mnt/bitcoin-data ext4 defaults 0 2
    ```

#### Step 9: Testing the Configuration

Reboot your system and test the configuration:

```bash
sudo reboot
```

After rebooting, verify the setup:

```bash
sudo df -h
sudo mount | grep bitcoin-blocks
sudo mount | grep bitcoin-data
sudo lvdisplay
# Expected output
#  --- Logical volume ---
#  LV Path                /dev/vg0/lv_data
#  LV Status              available
#  LV Size                <16.00 TiB
#  ...
```
