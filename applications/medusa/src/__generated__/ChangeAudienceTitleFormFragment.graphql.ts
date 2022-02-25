/**
 * @generated SignedSource<<44b08586b59b7b78d042867c42134476>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeAudienceTitleFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ChangeAudienceTitleFormFragment";
};
export type ChangeAudienceTitleFormFragment = ChangeAudienceTitleFormFragment$data;
export type ChangeAudienceTitleFormFragment$key = {
  readonly " $data"?: ChangeAudienceTitleFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeAudienceTitleFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeAudienceTitleFormFragment",
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
  "type": "Audience",
  "abstractKey": null
};

(node as any).hash = "ddef4e58e502da5a3e0f5564a5131f23";

export default node;
