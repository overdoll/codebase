/**
 * @generated SignedSource<<73051eff8fec59834c9143760039f05c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostVideoMediaFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"ControlledVideoFragment" | "useVideoControlsFragment">;
  readonly " $fragmentType": "PostVideoMediaFragment";
};
export type PostVideoMediaFragment$key = {
  readonly " $data"?: PostVideoMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostVideoMediaFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostVideoMediaFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ControlledVideoFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useVideoControlsFragment"
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "b56c83540747cad9c3e9d72efed3c28b";

export default node;
