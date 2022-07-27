/**
 * @generated SignedSource<<b82e7355e1aa838bee9100ff7373f278>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdatePostDescriptionFormFragment$data = {
  readonly description: string;
  readonly id: string;
  readonly " $fragmentType": "UpdatePostDescriptionFormFragment";
};
export type UpdatePostDescriptionFormFragment$key = {
  readonly " $data"?: UpdatePostDescriptionFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UpdatePostDescriptionFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UpdatePostDescriptionFormFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "480744756e752c852696909e224d929c";

export default node;
