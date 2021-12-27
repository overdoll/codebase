/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TotpSubmissionFragment = {
    readonly token: string;
    readonly " $refType": "TotpSubmissionFragment";
};
export type TotpSubmissionFragment$data = TotpSubmissionFragment;
export type TotpSubmissionFragment$key = {
    readonly " $data"?: TotpSubmissionFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"TotpSubmissionFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TotpSubmissionFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "token",
      "storageKey": null
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};
(node as any).hash = '4e067ae3310dbddaba61bc644fbf6fc8';
export default node;
