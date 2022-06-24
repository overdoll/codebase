/**
 * @generated SignedSource<<ab96f048e2cbf340e87312aa5a5ebdea>>
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
