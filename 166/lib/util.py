import requests
import pickle
import gzip
import os.path

def unzip(zipped_file,unzip_path):
    with open(unzip_path, 'w+') as f_in, gzip.open(zipped_file, 'wb') as f_out:
        f_out.writelines(f_in)


def load_raw_data(file_index, destination_dir):
    filebase = 'US_Weather_%s' % file_index
    c_filename = filebase + '.csv.gz'
    u_filename = filebase + '.csv'
    dest_path = destination_dir + "/" + c_filename
    unzip_path = destination_dir + "/" + u_filename
    source_url = "https://mas-dse-open.s3.amazonaws.com/Weather/small/"+c_filename
    print(source_url)
    if os.path.isfile(unzip_path) is False:
        with open(dest_path, "wb") as f:
            r = requests.get(source_url)
            f.write(r.content)
        unzip(dest_path, unzip_path)

    return pickle.load(open(unzip_path))
