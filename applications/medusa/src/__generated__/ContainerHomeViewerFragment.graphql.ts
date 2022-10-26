/**
 * @generated SignedSource<<be2b794717566eb70d2a13d7f600379f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerHomeViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BoxesHomeFragment" | "UrlCurationProfileFragment">;
  readonly " $fragmentType": "ContainerHomeViewerFragment";
};
export type ContainerHomeViewerFragment$key = {
  readonly " $data"?: ContainerHomeViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerHomeViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerHomeViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BoxesHomeFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UrlCurationProfileFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "66c4264fd0f60762e7d4c1c777ae998f";

export default node;
