/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ControlledVideoFragment = {
    readonly urls: ReadonlyArray<{
        readonly url: string;
        readonly mimeType: string;
    }>;
    readonly " $refType": "ControlledVideoFragment";
};
export type ControlledVideoFragment$data = ControlledVideoFragment;
export type ControlledVideoFragment$key = {
    readonly " $data"?: ControlledVideoFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ControlledVideoFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ControlledVideoFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ResourceUrl",
      "kind": "LinkedField",
      "name": "urls",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "url",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "mimeType",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Resource",
  "abstractKey": null
};
(node as any).hash = '2a87ba90e0eade9371fc9f407d792820';
export default node;
