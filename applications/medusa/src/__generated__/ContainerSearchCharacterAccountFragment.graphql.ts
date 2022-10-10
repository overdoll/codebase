/**
 * @generated SignedSource<<6d653ea588af7d00151036a6dfe55cd7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerSearchCharacterAccountFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ScrollSearchCharacterAccountFragment">;
  readonly " $fragmentType": "ContainerSearchCharacterAccountFragment";
};
export type ContainerSearchCharacterAccountFragment$key = {
  readonly " $data"?: ContainerSearchCharacterAccountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerSearchCharacterAccountFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerSearchCharacterAccountFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollSearchCharacterAccountFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "3f82948c6b46db58aa475f8d395971e8";

export default node;
