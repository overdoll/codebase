import glob
import os

import yaml


class YamlReaderError(Exception):
    pass


def data_merge(a, b):
    """merges b into a and return merged result

    NOTE: tuples and arbitrary objects are not handled as it is totally ambiguous what should happen"""
    key = None
    # ## debug output
    # sys.stderr.write("DEBUG: %s to %s\n" %(b,a))
    try:
        if a is None or isinstance(a, str) or isinstance(a, int) or isinstance(a, float):
            # border case for first run or if a is a primitive
            a = b
        elif isinstance(a, list):
            # lists can be only appended
            if isinstance(b, list):
                # merge lists
                a.extend(b)
            else:
                # append to list
                a.append(b)
        elif isinstance(a, dict):
            # dicts must be merged
            if isinstance(b, dict):
                for key in b:
                    if key in a:
                        a[key] = data_merge(a[key], b[key])
                    else:
                        a[key] = b[key]
            else:
                raise YamlReaderError('Cannot merge non-dict "%s" into dict "%s"' % (b, a))
        else:
            raise YamlReaderError('NOT IMPLEMENTED "%s" into "%s"' % (b, a))
    except TypeError as e:
        raise YamlReaderError('TypeError "%s" in key "%s" when merging "%s" into "%s"' % (e, key, b, a))
    return a


def load_configs():
    config = dict()

    # Load each pipeline.yaml, and merge them into a dict
    for filename in glob.iglob('./applications/**/pipeline.yaml', recursive=True):
        if os.path.isfile(filename):
            with open(filename, "r") as fd:
                config = data_merge(config, yaml.safe_load(fd))

    # also include libraries
    for filename in glob.iglob('./libraries/**/pipeline.yaml', recursive=True):
        if os.path.isfile(filename):
            with open(filename, "r") as fd:
                config = data_merge(config, yaml.safe_load(fd))

    with open('./.buildkite/config/pipeline.yaml', "r") as fd:
        config = data_merge(config, yaml.safe_load(fd))

    return config
