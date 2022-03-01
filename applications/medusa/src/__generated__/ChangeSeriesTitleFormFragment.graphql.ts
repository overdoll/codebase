/**
 * @generated SignedSource<<77e54cb12105c630b2b6c336e610545e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeSeriesTitleFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ChangeSeriesTitleFormFragment";
};
export type ChangeSeriesTitleFormFragment = ChangeSeriesTitleFormFragment$data;
export type ChangeSeriesTitleFormFragment$key = {
  readonly " $data"?: ChangeSeriesTitleFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeSeriesTitleFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeSeriesTitleFormFragment",
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
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "db61e6f039acb506535430e0011cbb70";

export default node;
