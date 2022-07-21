/**
 * @generated SignedSource<<1341ffdaf5a762827405d82075cb87dc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeTopicDescriptionFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ChangeTopicDescriptionFormFragment";
};
export type ChangeTopicDescriptionFormFragment$key = {
  readonly " $data"?: ChangeTopicDescriptionFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeTopicDescriptionFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeTopicDescriptionFormFragment",
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
  "type": "Topic",
  "abstractKey": null
};

(node as any).hash = "37281b575d0b76f1048a2855cef8b319";

export default node;
