import json
import os
import time
from shutil import copyfile
from urllib.parse import urlparse
from urllib.request import url2pathname

from . import exec
from . import terminal_print


def test_label_to_path(label, test_log):
    # remove leading //
    path = label[2:]
    path = path.replace("/", os.sep)
    path = path.replace(":", os.sep)
    path = os.path.join(path, os.path.basename(test_log))
    return path


def rename_test_logs_for_upload(test_logs):
    # Rename the test.log files to the target that created them
    # so that it's easy to associate test.log and target.
    new_paths = []
    for label, files in test_logs:
        for test_log in files:
            try:
                new_path = test_label_to_path(label, test_log)
                os.makedirs(os.path.dirname(new_path), exist_ok=True)
                copyfile(test_log, new_path)
                new_paths.append(new_path)
            except IOError as err:
                # Log error and ignore.
                terminal_print.eprint(err)
    return new_paths


def test_data_for_status(bep_file, status):
    targets = []
    coverage_logs = []
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
        if "testResult" in bep_obj:
            test_target = bep_obj["id"]["testResult"]["label"]
            test_status = bep_obj["testResult"]["status"]
            if test_status in status:
                outputs = bep_obj["testResult"]["testActionOutput"]
                test_logs = []
                exclude = ["test.xml"]

                # For successful tests, we don't include logs
                if test_status == "PASSED":
                    exclude.extend(["test.log", "attempt_1.log", "attempt_2.log", "attempt_3.log"])

                for output in outputs:
                    url = url2pathname(urlparse(output["uri"]).path)
                    if output["name"] == "test.lcov":
                        # we process coverage files separately
                        coverage_logs.append(url)
                    elif output["name"] not in exclude:
                        test_logs.append(url)
                        targets.append((test_target, test_logs))
        pos += size + 1
    return targets, coverage_logs


def upload_test_logs_from_bep(bep_file, stop_request):
    uploaded_targets = set()
    while True:
        done = stop_request.isSet()
        if os.path.exists(bep_file):
            all_test_logs, all_coverage_logs = test_data_for_status(bep_file,
                                                                    status=["FAILED", "TIMEOUT", "FLAKY", "PASSED"])

            test_logs_to_upload = [
                (target, files) for target, files in all_test_logs if target not in uploaded_targets
            ]

            # move coverage logs, but we dont upload them
            if all_coverage_logs:
                rename_test_logs_for_upload(all_coverage_logs)

            if test_logs_to_upload:
                files_to_upload = rename_test_logs_for_upload(test_logs_to_upload)
                cwd = os.getcwd()
                try:
                    # place test logs && coverage logs in root for easier access
                    # os.chdir(tmpdir)
                    test_logs = [os.path.relpath(file, cwd) for file in files_to_upload]
                    test_logs = sorted(test_logs)

                    exec.execute_command(["buildkite-agent", "artifact", "upload", ";".join(test_logs)])
                finally:
                    uploaded_targets.update([target for target, _ in test_logs_to_upload])
                    os.chdir(cwd)
        if done:
            break
        time.sleep(5)
