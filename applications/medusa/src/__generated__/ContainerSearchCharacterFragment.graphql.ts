/**
 * @generated SignedSource<<f43c12b6c249401b039ba8930248bb0b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerSearchCharacterFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"HeaderSearchCharacterFragment" | "ScrollSearchCharacterFragment">;
  readonly " $fragmentType": "ContainerSearchCharacterFragment";
};
export type ContainerSearchCharacterFragment$key = {
  readonly " $data"?: ContainerSearchCharacterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerSearchCharacterFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerSearchCharacterFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HeaderSearchCharacterFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollSearchCharacterFragment"
    }
  ],
  "type": "Character",
  "abstractKey": null
};

(node as any).hash = "1db39e4127294d273697a0dba7be3553";

export default node;
