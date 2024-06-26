/**
 * @generated SignedSource<<1c8555a628fba673f15e3c123b2f8dca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeCancellationReasonTitleFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ChangeCancellationReasonTitleFormFragment";
};
export type ChangeCancellationReasonTitleFormFragment$key = {
  readonly " $data"?: ChangeCancellationReasonTitleFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeCancellationReasonTitleFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeCancellationReasonTitleFormFragment",
  "selections": [
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      "action": "THROW",
      "path": "id"
    }
  ],
  "type": "CancellationReason",
  "abstractKey": null
};

(node as any).hash = "b276447ffcaa3e243b2a234fd22822c6";

export default node;
