import json
import os
import time
from shutil import copyfile
from urllib.parse import urlparse
from urllib.request import url2pathname

from . import exec
from . import terminal_print


def test_label_to_path(tmpdir, label, attempt):
    # remove leading //
    path = label[2:]
    path = path.replace("/", os.sep)
    path = path.replace(":", os.sep)
    if attempt == 0:
        path = os.path.join(path, "test.log")
    else:
        path = os.path.join(path, "attempt_" + str(attempt) + ".log")
    return os.path.join(tmpdir, path)


def rename_test_logs_for_upload(test_logs, tmpdir):
    # Rename the test.log files to the target that created them
    # so that it's easy to associate test.log and target.
    new_paths = []
    for label, files in test_logs:
        attempt = 0
        if len(files) > 1:
            attempt = 1
        for test_log in files:
            try:
                new_path = test_label_to_path(tmpdir, label, attempt)
                os.makedirs(os.path.dirname(new_path), exist_ok=True)
                copyfile(test_log, new_path)
                new_paths.append(new_path)
                attempt += 1
            except IOError as err:
                # Log error and ignore.
                terminal_print.eprint(err)
    return new_paths


def test_logs_for_status(bep_file, status):
    targets = []
    with open(bep_file, encoding="utf-8") as f:
        raw_data = f.read()
    decoder = json.JSONDecoder()

    pos = 0
    while pos < len(raw_data):
        try:
            bep_obj, size = decoder.raw_decode(raw_data[pos:])
        except ValueError as e:
            terminal_print.eprint("JSON decoding error: " + str(e))
            return targets
        if "testSummary" in bep_obj:
            test_target = bep_obj["id"]["testSummary"]["label"]
            test_status = bep_obj["testSummary"]["overallStatus"]
            if test_status in status:
                outputs = bep_obj["testSummary"]["failed"]
                test_logs = []
                for output in outputs:
                    test_logs.append(url2pathname(urlparse(output["uri"]).path))
                targets.append((test_target, test_logs))
        pos += size + 1
    return targets


def upload_test_logs_from_bep(bep_file, tmpdir, stop_request):
    uploaded_targets = set()
    while True:
        done = stop_request.isSet()
        if os.path.exists(bep_file):
            all_test_logs = test_logs_for_status(bep_file, status=["FAILED", "TIMEOUT", "FLAKY"])
            test_logs_to_upload = [
                (target, files) for target, files in all_test_logs if target not in uploaded_targets
            ]

            if test_logs_to_upload:
                files_to_upload = rename_test_logs_for_upload(test_logs_to_upload, tmpdir)
                cwd = os.getcwd()
                try:
                    os.chdir(tmpdir)
                    test_logs = [os.path.relpath(file, tmpdir) for file in files_to_upload]
                    test_logs = sorted(test_logs)
                    exec.execute_command(["buildkite-agent", "artifact", "upload", ";".join(test_logs)])
                finally:
                    uploaded_targets.update([target for target, _ in test_logs_to_upload])
                    os.chdir(cwd)
        if done:
            break
        time.sleep(5)
